export const getTopNotifications = (notifications, limit = 5) => {
  const priorityMap = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  return notifications
    .sort((a, b) => {
      // 🔥 priority compare
      const pA = priorityMap[a.Type] || 0;
      const pB = priorityMap[b.Type] || 0;

      if (pA !== pB) return pB - pA;

      // 🔥 latest first
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, limit);
};