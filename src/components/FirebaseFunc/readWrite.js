import { getDatabase,ref as refFirebase, onValue,set } from "firebase/database";

const database = getDatabase();
        console.log('database',database);
        const readFirebase = ()=>{
          const starCountRef = refFirebase(database, user.uid);
          onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            message.value = data;
            // updateStarCount(postElement, data);
            console.log(data);
          });
        }
          

        function writeUserData(userId) {
          set(refFirebase(database, 'test/aaa/'+userId), {
            username: "tName",
            email: 'bb@gg.com'
          });
        }
        setTimeout(()=>{
          writeUserData(user.uid);

          readFirebase();
          console.log("write")
        },2000);
        