use chrono::{DateTime, Local, Utc};
use dotenv::dotenv;
use std::{env, process::Output, string};

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
    fn get_area(&self)->T {
        return self.height * self.width;
    }
}


// struct  ====> structure
struct Student{
    roll_no:u32,
    name:String,
    class:String
}

enum Subjects{
    INFERENCE,
    STOCHASTIC,
    R,
    ML 
}

impl Student{
    fn get_marks(&self, subject:Subjects)->u32{
        90
    }

    fn total_marks(&self)->u32{
        100
    }
}


fn sum<T:std::ops::Add<Output = T>>(a:T, b:T) ->T{
    a+b
}

impl<T> Add for Student<T> {
    
}


trait Add {
    fn add<T>(a:T,b:T)->T{}
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

    let student_1 = Student{
        roll_no:1,
        name:String::from("dipak"),
        class:String::from("MSc")
    };

    println!("{}",student_1.get_marks(Subjects::ML))

}

