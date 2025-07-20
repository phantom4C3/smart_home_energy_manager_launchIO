interface Notification {
  _id: string,
  message: string,
  timestamp: string,
  type: string
}

interface NotificationListProps {
  notifications: Notification[];
}

export default function NotificationList({ notifications }: NotificationListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mt-18">Notifications</h2>

    <div className="mt-14 rounded-3xl p-4 bg-gradient-to-r from-pink-600 via-pink-400 to-rose-200  mx-auto sm:w-[14rem] md:w-[34rem] lg:w-[44rem] xl:w-[65rem]">
      {notifications.map((notification, index) => (
        <div key={index}  className="rounded-3xl p-px bg-gradient-to-r from-pink-600 via-pink-400 to-rose-200 mx-auto sm:w-[12rem] md:w-[32rem] lg:w-[42rem] xl:w-[63rem]">
          
          <div className="bg-[#160a3f] rounded-3xl px-2 py-4">
          <p >{notification.message}</p>
          <p className="text-sm text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
        </div>
        </div>
      ))}
    </div>
    </div>
  );
} 
