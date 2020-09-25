export interface Payload {
  id: String;
  profType?: String;
}

export function getPayLoad(payload: Payload) {
  return {
    id: payload.id,
    profType: payload.profType,
  };
}
