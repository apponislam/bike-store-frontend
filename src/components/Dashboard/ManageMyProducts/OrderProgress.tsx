const OrderProgress = ({ status }: { status: string }) => {
    const steps = [
        { id: 1, name: "Pending" },
        { id: 2, name: "Paid" },
        { id: 3, name: "Shipped" },
        { id: 4, name: "Completed" },
    ];

    const isCompleted = (stepName: string) => {
        const stepIndex = steps.findIndex((step) => step.name === stepName);
        const currentIndex = steps.findIndex((step) => step.name === status);
        return stepIndex <= currentIndex;
    };

    return (
        <div className="container mx-auto py-4">
            <div className="flex justify-between relative">
                {/* Progress Line */}
                <div className="absolute top-4 left-3 right-5 h-1 bg-gray-300 z-0"></div>

                {steps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center z-10">
                        {/* Circle */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted(step.name) ? "bg-green-500 border-2 border-green-500" : "bg-gray-300 border-2 border-gray-300"}`}>
                            {isCompleted(step.name) && (
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            )}
                        </div>

                        {/* Label */}
                        <p className={`mt-2 text-sm ${isCompleted(step.name) ? "text-gray-900" : "text-gray-400"}`}>{step.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderProgress;
