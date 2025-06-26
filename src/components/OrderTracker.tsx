import React from 'react';
import { CheckCircle2, CookingPot, Bike, PartyPopper } from 'lucide-react';

// Define the possible statuses for type safety
type OrderStatus = 'Order Placed' | 'In the Kitchen' | 'Out for Delivery' | 'Delivered';

// Define the component's props interface
interface OrderTrackerProps {
  currentStatus: OrderStatus;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({ currentStatus }) => {
  console.log('OrderTracker loaded with status:', currentStatus);

  const stages: { name: OrderStatus; icon: React.ReactElement }[] = [
    { name: 'Order Placed', icon: <CheckCircle2 /> },
    { name: 'In the Kitchen', icon: <CookingPot /> },
    { name: 'Out for Delivery', icon: <Bike /> },
    { name: 'Delivered', icon: <PartyPopper /> },
  ];

  const currentStageIndex = stages.findIndex(stage => stage.name === currentStatus);

  return (
    <div className="w-full p-4 md:p-6 bg-white rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-6 text-center text-gray-800">Track Your Order</h3>
      <div className="flex items-start">
        {stages.map((stage, index) => {
          const isCompleted = index <= currentStageIndex;
          const isCurrent = index === currentStageIndex;

          const iconContainerClasses = [
            'flex', 'items-center', 'justify-center', 'w-10', 'h-10', 'md:w-12', 'md:h-12',
            'rounded-full', 'border-2', 'transition-all', 'duration-300',
            isCompleted ? 'bg-green-100 border-green-500 text-green-600' : 'bg-gray-100 border-gray-300 text-gray-400'
          ].join(' ');

          const textClasses = [
            'mt-2', 'text-xs', 'md:text-sm', 'transition-colors', 'duration-300', 'text-center',
            isCompleted ? 'text-gray-800' : 'text-gray-500',
            isCurrent ? 'font-bold' : 'font-medium'
          ].join(' ');
          
          const connectorClasses = [
            'flex-1', 'h-1', 'mt-5', 'md:mt-6', 'mx-1', 'md:mx-2', 'rounded-full', 'transition-colors', 'duration-500',
            isCompleted && index < currentStageIndex ? 'bg-green-500' : 'bg-gray-200'
          ].join(' ');

          return (
            <React.Fragment key={stage.name}>
              <div className="flex flex-col items-center">
                <div className={iconContainerClasses}>
                  {React.cloneElement(stage.icon, { className: "w-5 h-5 md:w-6 md:h-6" })}
                </div>
                <p className={textClasses}>
                  {stage.name}
                </p>
              </div>

              {/* Render connector line between stages */}
              {index < stages.length - 1 && (
                <div className={connectorClasses}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracker;