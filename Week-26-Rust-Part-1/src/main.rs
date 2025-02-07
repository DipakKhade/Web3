fn main() {
    let ans = sum(2,3);
    println!("{}",ans);

    let is_even=isEven(13);
    println!("{}",is_even);

    let arr:[i32;3]=[1,2,3];
    println!("{:?}",arr);

    let str = String::from("dipak");
    let len = get_len(str);
    println!("{}",str)   // the ownership is moved of str to a variable s 

}

fn get_len(s:String)->usize{
    s.len()
}

fn sum(a:u32,b:u32)->u32{
    a+b
}

fn isEven(n:u32)->bool{
    n%2 ==0
}
