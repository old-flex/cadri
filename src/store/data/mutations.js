export function setSubdivisionsAfterLogin(state, payload) {
  payload = payload.map((s) => {
    return{
      ...s,
      label: s.name
    }
  });
  state.subdivisions = payload
}
