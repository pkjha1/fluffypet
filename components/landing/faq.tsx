import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  return (
    <section className="container space-y-8 py-12 lg:py-20">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Everything you need to know about FluffyPet
        </p>
      </div>
      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

const faqs = [
  {
    question: "How does FluffyPet's AI diagnostics work?",
    answer:
      "Our AI system processes real-time biometric data from your pet's smart collar, including heart rate, temperature, and activity levels. It uses advanced algorithms to detect patterns and anomalies that might indicate health issues before they become serious.",
  },
  {
    question: "Is my pet's data secure?",
    answer:
      "Yes, absolutely! We use blockchain technology to ensure all your pet's health records are secure, immutable, and private. You have complete control over who can access your pet's information.",
  },
  {
    question: "What kind of support is available?",
    answer:
      "We offer 24/7 virtual vet support through our AI-powered chatbot. For more serious concerns, you can instantly connect with licensed veterinarians through our platform.",
  },
  {
    question: "How accurate is the health monitoring?",
    answer:
      "Our system has a 99.9% success rate in early disease detection. The smart collar continuously monitors vital signs and activity, providing real-time alerts if any anomalies are detected.",
  },
  {
    question: "Can I use FluffyPet with multiple pets?",
    answer:
      "Yes! FluffyPet is designed to handle multiple pets. Each pet gets their own profile with individualized health tracking, AI insights, and medical records.",
  },
]

