import 'firebase/firestore';
import Song from '../interfaces/song';
import fire from './fire';
export async function getQueue():Promise<Song[]>{
    const doc=await fire.firestore().collection('queue').doc('queue').get()
    if(doc&&doc.exists){
        const docData:any=doc.data();
        return docData.queue as Song[];
    }
    return [];
}
