import { DECKS_API_URL, REQUEST_HEADERS } from './../constants/api';

export const createRepository = <T, U>(resource?: string) => {
  const url = resource ? `${DECKS_API_URL}${resource}` : DECKS_API_URL;

  const list = async (): Promise<T[]> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status}: 一覧の取得に失敗しました`);
    }
    return (await response.json()) as T[];
  };

  const create = async (payload: U): Promise<T> => {
    const response = await fetch(url, {
      method: 'POST',
      headers: REQUEST_HEADERS,
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`${response.status}: 登録に失敗しました`);
    }
    return (await response.json()) as T;
  };

  const update = async (id: number, payload: U): Promise<T> => {
    const response = await fetch(`${url}${id}/`, {
      method: 'PUT',
      headers: REQUEST_HEADERS,
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`${response.status}: 更新に失敗しました`);
    }
    return (await response.json()) as T;
  };

  const destroy = async (id: number): Promise<void> => {
    const response = await fetch(`${url}${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`${response.status}: 削除に失敗しました`);
    }
  };

  return { list, create, update, destroy };
};
