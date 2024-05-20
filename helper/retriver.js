export default async function retriver() {
  try {
    let docs = await fetch("/api/retrive", { cache: 'no-cache' });
    docs = await docs.json();
    return docs;
  } catch (error) {
    return [];
  }
}
