import { STORAGE_KEY } from './constants';

export type storeDatas = {
  acessToken?: string;
  refreshToken?: string;
}

export function saveToSessionStorage(datas: storeDatas): void {
  try {
    const serializedDatas = JSON.stringify(datas);
    sessionStorage.setItem(STORAGE_KEY, serializedDatas);
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
    const serializedDatas = sessionStorage.getItem(STORAGE_KEY);

    if (!serializedDatas) return null;

    return JSON.parse(serializedDatas);

  } catch (error) {
    throw error;
  }
}
