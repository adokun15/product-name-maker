import { Notifier } from "@/actions/notifier";
import { ToDateString } from "@/lib/dateHelper";
import { UpdateUserDatabase } from "@/utils/User/UpdateUser";
import crypto from "crypto";

export const POST = async (req, res) => {
  const hashKey = crypto
    .createHmac("sha256", process.env.PAYSTACK_API_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hashKey === req.headers["x-paystack-signature"]) {
    const webhook = req.body;

    // Send back webhook received
    res.status(200).json("Webhook received");

    const id = webhook?.data?.customer?.metadata?.userId;

    if (!id) {
      res.status(401).json("Identification failed");
    }

    switch (webhook.event) {
      case "subscription.create":
        // Send notification about Subscription Creation
        await Notifier(
          id,
          "Subsciption Created Successfully",
          `Hi ${webhook?.data?.customer?.first_name}, your subscription has been created. Now you can enjoy our Pro plan features.`
        );
        // update Subscription Db
        await UpdateUserDatabase(id, "subcriptions", {
          subscription: {
            status: webhook?.data?.status,
            sub_code: webhook?.data?.subscription_code,
            amount: webhook?.data?.amount,
            createdAt: webhook?.data?.createdAt,
            next_payment_date: webhook?.data?.next_payment_date,
          },
        });
        break;

      case "charge.success":
        // Send Notification telling Customer They Been Charge SOME certain Amount
        await Notifier(
          id,
          "Card Debited",
          `Hello ${webhook?.data?.customer?.first_name}, Your {brand} card ending with {last4} has been debited of {amount}`
        );

        //UnLIMITED ROKEN
        await UpdateUserDatabase(id, "users", { token: "UNLIMITED" });

        break;
      case "charge.failed":
        await UpdateUserDatabase(id, "users", { token: "EXPIRED" });
        break;

      case "invoice.create":
        //Send Notification
        await Notifier(
          id,
          "Subscription Deadline",
          `Hi ${
            webhook?.data?.customer?.first_name
          }, Your Subcription is going to end ${ToDateString(
            webhook?.data?.period_end
          )}`,
          {
            name: "Manage Subcription",
            type: "manage_url",
            code: webhook?.data?.subscription?.subscription_code,
          },
          webhook?.data?.transaction?.reference
        );
        break;

      case "invoice.payment_failed":
        //Send Notification
        await Notifier(
          id,
          "Subscription Payment Failed!",
          `Hello ${webhook?.data?.customer?.first_name}, Your monthly Namify Subcription payment has failed`
        );
        //Expired token
        await UpdateUserDatabase(id, "users", { token: "EXPIRED" });

        break;

      case "invoice.update":
        //Send Notification
        await Notifier(
          id,
          "Subscription Payment Successful!",
          `Your monthly Namify Subcription payment has been renewed`,
          {
            name: "Manage Subcription",
            type: "manage_url",
            code: webhook?.data?.subscription?.subscription_code,
          },
          webhook?.data?.transaction?.reference
        );

        // update Subscription Db
        await UpdateUserDatabase(id, "subcriptions", {
          subscription: {
            status: webhook?.data?.subscription.status,
            sub_code: webhook?.data?.subscription.subscription_code,
            amount: webhook?.data?.subscription.amount,
            createdAt: webhook?.data?.created_at,
            next_payment_date: webhook?.data?.subscription.next_payment_date,
          },
        });

        break;
      case "subscription.not_renew":
        //Send Notification
        await Notifier(
          id,
          "Subscription has been Cancelled!",
          `Your monthly Namify Subcription has been Cancelled.`,
          {
            name: "Manage Subcription",
            type: "manage_url",
            code: webhook?.data?.subscription_code,
          },
          "reference"
        );
        //update subcription
        await UpdateUserDatabase(id, "subcriptions", {
          subscription: {
            status: webhook?.data?.status,
            sub_id: webhook?.data?.id,
            sub_code: webhook?.data?.subscription_code,
            email_token: webhook?.data?.email_token,
            amount: webhook?.data?.amount,
            createdAt: webhook?.data?.created_at || null,
            next_payment_date: webhook?.data?.next_payment_date,
          },
        });
        break;
      case "subscription.disabled":
        //Send Notification
        await Notifier(
          id,
          "Subscription Disabled ",
          `Hi ${webhook?.data?.customer?.first_name}, You are getting close to the end of your subscription. Note that you are not going to be charged on your Card`,
          {
            name: "Manage Subcription",
            type: "manage_url",
            code: webhook?.data?.subscription_code,
          }
        );

        await UpdateUserDatabase(id, "subcriptions", {
          subscription: {
            status: "Disabled",
            sub_code: webhook?.data?.subscription_code,
            email_token: webhook?.data?.email_token,
            amount: webhook?.data?.amount,
            createdAt: webhook?.data?.created_at || null,
            next_payment_date: webhook?.data?.next_payment_date,
          },
        });

        break;

      case "subscription.expiring_cards":
        //notifier
        await Notifier(
          id,
          "Expiring Card",
          `Hello ${webhook?.data?.customer?.first_name}, Your Card is expiring on ${ebhook?.data[0]?.expiry_date}. Click the button below to change your Card.`,
          {
            name: "Manage Subcription",
            type: "manage_url",
            code: webhook?.data?.subscription?.subscription_code,
          }
        );
        break;
      default:
        return res.status(200).json("Webhook Received");
    }
  }
};
