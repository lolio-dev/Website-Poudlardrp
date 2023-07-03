import { maxBy } from 'lodash';
import { ProfileSchema } from '../../resources/profile/entity/profile.schema';

export function profileToMarkdown(profile: ProfileSchema) {
  let result = '## User\r\n';

  Object.keys(profile).forEach(key => {
    result += `- ${key}: ${profile[key]}\r\n`;
  });

  return result;
}

export function arrayToMarkdown(label: string, array: any[]) {
  let result = `## ${label}\r\n`;

  if (array.length > 0) {
    const headers = Object.keys(array[0]);
    const lengths = getMaxLengthByKeys(headers, array);

    result += getHeader(headers, lengths);
    result += getValues(array, lengths);
  } else {
    result += 'No datas';
  }
  return result;
}

function getMaxLengthByKeys(headers: string[], datas: any[]) {
  return Object.keys(datas[0]).map((key, index) => {
    const header = headers[index].length + 2;
    let max = maxBy(datas, d => d[key].toString().length);

    max = max ? max[key].toString().length + 2 : 3;

    return max > header ? max : header;
  });
}

function getValues(datas: any[], lengths: number[]) {
  let result = '';

  datas.forEach((d, i) => {
    Object.keys(d).forEach((key, j) => {
      result += `${roundColumns(d[key].toString(), lengths[j] + 2)}|`;
    });
    result += i !== datas.length - 1 ? '\r\n|' : '';
  });

  return result;
}

function getHeader(headers: string[], lengths: number[]) {
  let result = '|';
  headers.forEach((h, i) => {
    result += `${roundColumns(h, lengths[i] + 2)}|`;
  });

  result += '\r\n|';

  lengths.forEach(i => {
    result += '-'.repeat(i + 2) + '|';
  });

  result += '\r\n|';

  return result;
}

function roundColumns(text: string, size: number) {
  for (let i = text.length; i < size; i++) {
    text = i % 2 === 0 ? ' ' + text : text + ' ';
  }
  return text;
}
