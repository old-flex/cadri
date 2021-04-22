export function setSubdivisionsAfterLogin(state, payload) {
  payload = payload.map((s) => {
    return{
      ...s,
      label: s.name
    }
  });
  state.subdivisions = payload
}

export function setMarks(state, payload) {
  payload = payload.map((s) => {
    return{
      label: s.name,
      value: s.name
    }
  });
  state.marks = payload
}
