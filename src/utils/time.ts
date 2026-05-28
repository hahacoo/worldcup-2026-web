const dateTimeFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  month: "long",
  day: "numeric",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const shortDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  month: "numeric",
  day: "numeric",
  weekday: "short",
});

export function formatKickoff(isoString: string) {
  return dateTimeFormatter.format(new Date(isoString)).replace("周", "星期");
}

export function formatShortDate(isoString: string) {
  return shortDateFormatter.format(new Date(isoString));
}

export function getCountdownLabel(isoString: string, now = new Date()) {
  const diff = new Date(isoString).getTime() - now.getTime();

  if (diff <= 0) {
    return "已开赛或已结束";
  }

  const minutes = Math.floor(diff / 1000 / 60);
  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  const remainMinutes = minutes % 60;

  if (days > 0) {
    return `${days}天 ${hours}小时后`;
  }

  if (hours > 0) {
    return `${hours}小时 ${remainMinutes}分钟后`;
  }

  return `${remainMinutes}分钟后`;
}

export function isUpcoming(isoString: string, now = new Date()) {
  return new Date(isoString).getTime() > now.getTime();
}
