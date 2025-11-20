import type { IconType } from "react-icons/lib";

interface Props {
  title: string;
  value: number;
  color: string;
  icon: IconType;
}

const StatCard = (props: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">
            {props.title}
          </p>
          <p className="text-3xl font-bold text-gray-800">{props.value}</p>
        </div>
        <div className={`${props.color} p-3 rounded-lg`}>
          {<props.icon className="w-6 h-6" />}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
