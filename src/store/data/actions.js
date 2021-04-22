export async function loadSubdivisions (context) {
  const response = await fetch('http://192.168.1.188:8080/api/getSubdivisions');
  const data = await response.json()
  context.commit('setSubdivisionsAfterLogin', data)
}

export async function loadMarks(context) {
  const response = await fetch('http://192.168.1.188:8080/api/getMarks');
  const data = await response.json()
  context.commit('setMarks', data)
}
