export default function FAQPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>

      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">What is TreasurePal?</h2>
          <p className="text-gray-600">
            TreasurePal is a property and agent management platform.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">How do I verify my phone?</h2>
          <p className="text-gray-600">
            Sign in, add your phone number, and enter the OTP sent to you.
          </p>
        </div>
      </div>
    </main>
  );
}
