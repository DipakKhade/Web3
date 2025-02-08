#[warn(unused_variables)]
fn main() {
    let ans = sum(2,3);
    println!("{}",ans);

    let is_even=isEven(13);
    println!("{}",is_even);

    let arr:[i32;3]=[1,2,3];
    println!("{:?}",arr);

    let str = String::from("dipak");
    let len = get_len(&str);
    println!("{}",str);   // the ownership is moved of str to a variable s 

    // for i in 0..101{
    //     println!("{}",i)
    // }

    let new_arr :[u32;4]= [4,5,6,8];
    // let new_arr_iter:[u32;4] = new_arr.iter().map(|i| *i+1).collect();
    for i in new_arr{
        print!("value {}\n",i)
    };

    println!("{:?}",new_arr)


}

fn get_len(s:&str)->usize{
    s.len()
}

fn sum(a:u32,b:u32)->u32{
    a+b
}

fn isEven(n:u32)->bool{
    n%2 ==0
}

// browwing and refereces


