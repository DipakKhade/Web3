

trait Student {
    fn get_roll_no(&self)->u32;
}

#[derive(Debug)]
struct Classroom{
    std:String
}

impl Student for Classroom{
    fn get_roll_no(&self)->u32 {
        3
    }
}

macro_rules! generate_function {
    ($($tt:tt)*) => {
        println!("from the generate_function macro {}",$($tt)*);
    };
}

fn main(){
    let n = 3;
    let n2=n;
    println!("{},{}",n,n2);
    generate_function!(String::from("asd1"),)
}

fn get_student_class(s:impl Student)->Option<u32>{
    Some(3)
}


//Write a macro that can take more than one function name as input and create functions for it
macro_rules! define_my_function {
    ($t:ty) => {
        ::paste::paste! {
            pub fn [<$t:lower _function>]() {
                println!(concat!("This is a function for type: ", stringify!($t)));
            }
        }
    };
}
