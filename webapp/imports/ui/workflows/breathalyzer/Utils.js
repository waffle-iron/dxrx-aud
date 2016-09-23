

export function timeBefore (cur,minutesAgo) {
  if ((typeof cur) === 'undefined') return undefined;
  var now = new Date(cur.getTime());
  var ms = now.getTime();
  console.log('In timeBefore with ' + now.toLocaleTimeString() + ' and ' + minutesAgo);
  ms = ms + (minutesAgo*1000*60);
  now.setTime(ms);
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setMinutes(10*Math.floor(now.getMinutes()/10));
  return (now.toLocaleTimeString());
}

export function timeString (d) {
  d.setSeconds(0);
  d.setMilliseconds(0);
  return (d.toLocaleTimeString());
}

export function timeBeforeValue (now,minutesAgo) {
  if ((typeof now) === 'undefined') return undefined;
  let ms = now.getTime();
  ms = ms + (minutesAgo*1000*60);
  return (new Date(ms));
}

export function getValue(structName,fieldName,def) {
  var v= Session.get(structName);
  if (typeof v === 'undefined') {
    return def;
  }
  if (typeof (v[fieldName]) === 'undefined') {
    return def;
  }
  return v[fieldName];
}

export function setValue (structName,fieldName, value) {
  var data = Session.get(structName);
  data[fieldName] = value;
  Session.set(structName, data);
}

export function shallowCopy(source) {
  var key,value;
  if (Array.isArray(source)) {
    var t = new Array();
    for (var i = 0; i < source.length; ++i) {
      t[i] = shallowCopy(source[i]);
    }
    return t;
  } else if (source instanceof Date) {
    var c = new Date();
    c.setTime(source.getTime());
    return c;
  } else {
    var clone = Object.create(source);
    for (key in source) {
      if (source.hasOwnProperty(key) === true) {
        value = source[key];
        if (value!==null && typeof value==='object') {
          clone[key] = shallowCopy(value);
        } else {
          clone[key] = value;
        }
      }
    }
    return clone;
  }
}

export function echoValue(value) {
  return value;
}

export function min(v1,v2) {
  if (v1 > v2) return v2;
  return v1;
}

export function max(v1,v2) {
  if (v1 < v2) return v2;
  return v1;
}
