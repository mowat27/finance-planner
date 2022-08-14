import { DateTime } from "luxon";

interface Props {
  datetime: DateTime;
}

export default function CalendarDate({ datetime }: Props) {
  return (
    <div className="rounded-lg shadow-md border-2 border-solid border-gray-100 text-center aspect-square w-14">
      <div className="rounded-t-lg bg-red-500 text-white">
        {datetime.toFormat("MMM")}
      </div>
      <div className="text-xl">{datetime.day}</div>
    </div>
  );
}
