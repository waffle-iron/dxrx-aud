

export function timeBefore (cur,minutesAgo) {
  if ((typeof cur) === 'undefined') return undefined;
  var t = timeBeforeValue(cur,minutesAgo);
  return (t.toLocaleTimeString());
}

export function timeString (d) {
  var t = new Date(d.getTime());
  t.setSeconds(0);
  t.setMilliseconds(0);
  return (t.toLocaleTimeString());
}

export function timeBeforeValue (t,minutesAgo) {
  if ((typeof t) === 'undefined') return undefined;
  let ms = t.getTime();
  ms = ms + (minutesAgo*1000*60);
  var a = new Date(ms);
  a.setSeconds(0);
  a.setMilliseconds(0);
  a.setMinutes(10*Math.floor(a.getMinutes()/10));
  return (a);
}

export function setData (structVar, event, value) {
  var data = Session.get(structVar);
  data[event] = value;
  var classVar = Object.assign(data);
  Session.set(structVar, classVar);
}

export function getData (structVar, event) {
  var data = Session.get(structVar);
  return data[event];
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

export function setRawValue (structVar, event, valueForSetting, ev2, val) {
  var data = Session.get(structVar);
  console.log('setRawValue: ' + ' s=' + structVar + ' ev=' + event + ' vs=' +  valueForSetting + ' ev2=' + ev2 + ' val=' + val + ' payload= '+ JSON.stringify(data));
  data[event].rawValue = val;
  data[event].value = (typeof val) === 'undefined' ? undefined : valueForSetting(val);
  data[event].timeStamp = new Date();
  var classVar = shallowCopy(data);
  Session.set(structVar, classVar);
}


export function getRawValue(structName,fieldName,def) {
  var v= Session.get(structName);
  if (typeof v === 'undefined') {
    return def;
  }
  if (typeof (v[fieldName]) === 'undefined') {
    return def;
  }
  if (typeof (v[fieldName].rawValue) === 'undefined') {
    return def;
  }
  return v[fieldName].rawValue;
}

export function getStandardValue(structName,fieldName,def) {
  var v= Session.get(structName);
  if (typeof v === 'undefined') {
    return def;
  }
  if (typeof (v[fieldName]) === 'undefined') {
    return def;
  }
  if (typeof (v[fieldName].value) === 'undefined') {
    return def;
  }
  return v[fieldName].value;
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
