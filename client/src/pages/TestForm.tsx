import SimpleApplicationForm from "@/components/common/SimpleApplicationForm";

export default function TestForm() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Simple Application Form Test</h1>
      <p className="text-center text-gray-600 mb-8">
        This is a simplified form for testing the application submission process.
      </p>
      <SimpleApplicationForm />
    </div>
  );
}