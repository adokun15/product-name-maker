import crypto from "crypto";
export const POST = async (req, res) => {
  const hashKey = crypto
    .createHmac("sha256", process.env.PAYSTACK_API_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hashKey === req.headers["x-paystack-signature"]) {
    const webhook = req.body;

    // Send back webhook received
    res.status(200).send("Webhook received");

    switch (webhook.event) {
      case "subscription.create":
        // Send notification about Subscription Creation
        //UnLIMITED ROKEN
        break;
      case "charge.success":
      // Send Notification telling Customer They Been Charge SOME certain Amount
      //UnLIMITED ROKEN
      case "charge.failed":
      // Send Notification telling Customer They Been  SOME certain Amount
      //set to 0
      case "invoice.create":
      //Send Email
      //Send Notification
      //about incoming Subsciption Charge
      case "subscription.failed":
      //remove token
      //update db about subscription
      //Send Email
      //Send Notification
      //about Failed Subcription,

      case "subscription.not_renew":
      //update db about subscription
      //Send Email
      //Send Notification
      //about not renewing,
      //remove token
      case "subscription.disabled":
      //update db about subscription
      //remove token
      //Send Email
      //Send Notification

      case "subscription.expiring_cards":
      //update db about subscription
      //remove token
      //Send Email
      //Send Notification
    }
  }
};
