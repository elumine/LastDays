export class DateCommon {
  static DateDisplayText(d: Date) {
    return `${z(d.getFullYear())}-${z(d.getMonth() + 1)}-${z(d.getDate())}.${z(d.getHours())}:${z(d.getMinutes())}:${z(d.getSeconds())}`;
  }
  static DateDisplayTextYYMMDD(d: Date) {
    return `${z(d.getFullYear())}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
  }
  static TimeDisplayText(d: Date) {
    return `${z(d.getHours())}:${z(d.getMinutes())}:${z(d.getSeconds())}`;
  }
}

function z(v: number) {
  const s = v.toString();
  if (s.length > 1) {
    return s;
  } else if (s.length === 1) {
    return `0${s}`;
  } else {
    return `00`;
  }
}
