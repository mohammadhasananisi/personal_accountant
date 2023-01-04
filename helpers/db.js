// import * as FileSystem from 'expo-file-system';
import * as SQLite from "expo-sqlite";


// console.log(FileSystem.documentDirectory);
// FileSystem.deleteAsync(FileSystem.documentDirectory + "Calc_2.db");
const db = SQLite.openDatabase("Calc_2.db");

db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
  console.log('Foreign keys turned on')
);

export const altertableitems = () =>{
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `ALTER TABLE Calc_item ADD COLUMN pay BOOLEAN DEFAULT 0;`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
}


export const use_from = () => {
  db.transaction((tx) => {
    tx.executeSql(
      // `SELECT * FROM Calc_item;`,
      `ALTER TABLE Calc_item ADD COLUMN pay BOOLEAN DEFAULT 0;`,
      [],
      (_, { rows: { _array } }) => {
      console.log(_array); console.log('is use_from');
      }
      
    );
  });
  return "null";
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Calc_item;",
        // "DELETE FROM  Users WHERE id !=1",
        // "DROP TABLE Users;",
        // "INSERT INTO Users (title) VALUES (?);",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const init_Make_Users = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Users_db (
        id INTEGER PRIMARY KEY,
        title varchar(255) NOT NULL,
        image varchar(255) NULL
        );`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const init_Make_Calc_item = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS Calc_item (
          id INTEGER PRIMARY KEY NOT NULL,
          title varchar(255) NOT NULL,
          mablagh BIGINT NOT NULL,
          for_user INTEGER NOT NULL,
          status TINYINT DEFAULT 0,
          pay BOOLEAN DEFAULT 0,
          FOREIGN KEY (for_user)
          REFERENCES Users_db(id) ON DELETE CASCADE
            );`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertCalc = (id, title, mablagh, for_user,pay=0) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO Calc_item (id,title, mablagh, for_user, status, pay) VALUES (?,?,?,?,?,?);`,
        [id, title, mablagh, for_user, 0, pay],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  }).catch(error => {
    const alter = altertableitems();
    console.log(alter);
    console.log('altertableitems');
    
    return error;
  });
  return promise;
};



export const Edit_Calc_db = (id, title, mablagh, for_user) => {
  
  
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE Calc_item SET title = ? , mablagh = ? WHERE id = ? AND for_user = ?`,
        [title,mablagh,id,for_user],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};


export const fetchCalc = (userid) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Calc_item WHERE for_user= ? AND status=0 ORDER BY id DESC;",
        [userid],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchCalc_archive = (userid) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Calc_item WHERE for_user=? AND status=1 ORDER BY id DESC; ",
        [userid],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const full_delete_db = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM  Calc_item WHERE id =${id}`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const send_to_Archive_db = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Calc_item SET status = 1 WHERE status=0 AND id=? ;",
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const send_to_ListItem_db = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Calc_item SET status = 0 WHERE status=1 AND id=? ;",
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchCalc_Users = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Users_db;",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertUsers = (id, title, image) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO Users_db (id,title, image) VALUES (?,?,?);`,
        [id, title, image],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const UpdateUser_db = (id, title, image) => {
  // console.log(title);

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE Users_db SET 
        title = ?,
        image = ?
        WHERE id= ? ;`,
        [title, image, id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const full_delete_users_db = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM  Users_db WHERE id =${id}`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
