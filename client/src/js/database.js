import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  const dbPromise = initdb();

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
const jateDB = await dbPromise;
// const jateDB = await openDB('jate', 1);
const tx = jateDB.transaction('jate', 'readwrite');
const store = tx.objectStore('jate');
// const request = store.put({ id: 1, value: content });
const request = store.put({ id: 1, value: JSON.stringify(content) });
const result = await request;
// await store.put({ content: content });
return result;
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = await dbPromise;
  // const jatedb = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  // const allContent = await store.getAll();
  // return allContent.map((entry) => entry.content);
  // return result.value;
  return result ? JSON.parse(result.value) : '';
};

initdb();