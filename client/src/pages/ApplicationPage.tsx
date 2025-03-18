import { motion } from "framer-motion";
import ApplicationForm from "@/components/common/ApplicationForm";
import { Helmet } from "react-helmet";

export default function ApplicationPage() {
  return (
    <>
      <Helmet>
        <title>Apply to HempLaunch | Start Your Hemp Business Journey</title>
        <meta 
          name="description" 
          content="Apply to HempLaunch and start your hemp business journey. Our streamlined application process helps us understand your business goals to provide the best support."
        />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-12 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-[#2F5D50] mb-4">
              Apply to HempLaunch
            </h1>
            <p className="text-gray-600 text-lg">
              Complete this short application to get started with your hemp business journey. 
              After submission, one of our experts will contact you to discuss next steps.
            </p>
          </motion.div>
          
          <ApplicationForm />
        </div>
      </div>
    </>
  );
}