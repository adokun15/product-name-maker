import { checkPaymentMethod } from "@/lib/BoolFunctions";
import { SuccessTransactionPage } from "./_successPage";
import { FailedTransactionPage } from "./_failedPage";

export default async function ResultPage({ params, searchParams }) {
  const payment_method = await checkPaymentMethod(
    params.uid,
    searchParams.reference
  );

  //expect {message ,error}
  if (!payment_method || payment_method?.error) {
    return (
      <FailedTransactionPage
        message={payment_method?.message || "Something went wrong!"}
      />
    );
  }

  //Expects {amount, reference,  }
  return <SuccessTransactionPage payment={payment_method} />;
}
