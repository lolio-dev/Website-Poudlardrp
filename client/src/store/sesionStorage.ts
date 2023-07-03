import { storage_key } from '../constants';

export type storeDatas = {
  accessToken?: string;
};

export function saveToSessionStorage(datas: storeDatas): void {
  try {
    const serializedDatas = JSON.stringify(datas);
    sessionStorage.setItem(storage_key, serializedDatas);
  } catch (error) {
    throw error;
  }
}

export function updateSessionStorage(newDatas: storeDatas): void {
  const currentDatas: storeDatas | null = loadFromSessionStorage();
  if (currentDatas) {
    saveToSessionStorage({ ...currentDatas, ...newDatas });
  } else {
    saveToSessionStorage(newDatas);
  }
}

export function loadFromSessionStorage(): storeDatas | null {
  try {
    const serializedDatas = sessionStorage.getItem(storage_key);
    if (!serializedDatas) return null;

    return JSON.parse(serializedDatas);
  } catch (error) {
    throw error;
  }
}

export function clearSessionStorage(): void {
  sessionStorage.removeItem(storage_key);
}
