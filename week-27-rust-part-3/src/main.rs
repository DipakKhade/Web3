use chrono::{DateTime, Local, Utc};
use dotenv::dotenv;
use std::{env, process::Output};

struct React<T> {
    height: T,
    width: T,
}

impl React<i32> {
    fn area(&self) -> i32 {
        self.height * self.width
    }
}

impl<T: std::ops::Mul<Output = T> + Copy> React<T> {
    fn get_area(&self) {
        return self.height * self.width;
    }
}

fn main() {
    dotenv().ok();
    let utc: DateTime<Utc> = Utc::now();
    println!("{}", utc);
    let name = env::var("NAME").unwrap();
    println!("this is a unwrap env : {}", name);
    //match name {
    //   Ok(name) => println!("this is a env var :{}", name),
    //  Err(e) => println!("not had env var"),
    //}
}
