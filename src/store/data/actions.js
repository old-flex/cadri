export async function loadSubdivisions (context) {
  const response = await fetch('http://localhost:8080/api/getSubdivisions');
  const data = await response.json()
  context.commit('setSubdivisionsAfterLogin', data)
}
