import Swal from 'sweetalert2';


export async function getCaptcha(setCaptcha){
    try {
        
        const response = await fetch(`${process.env.REACT_APP_URL}/api/captcha`,{
            method: 'GET',
    credentials: 'include',
        });
    const captchaSVG = await response.json();
    setCaptcha(captchaSVG)
    } catch (error) {
        console.log(error);

        const Toast = Swal.mixin({
            toast: true,
            position:"top",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon:'error',
            title: "CAPTCHA failed. Refresh"
          });
        
    }
    
}

export async function loginUserApi(data){
        
    try {
        const response = await fetch(`${process.env.REACT_APP_URL}/api/login`,{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        })

        const respData =await response.json()
        return respData;
    } catch (error) {
        console.log(error);
        alert('Error while login.')
        return;
    }   
    }

    export async function resetUserPassword(data){
    
            

            try {
                const response = await fetch(`${process.env.REACT_APP_URL}/api/forgotPassword`,{
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(data)
                })

                const responseData = await response.json();
                return responseData;
            } catch (error) {
                console.log(error);
                return;
            }
        }

export async function changePassword(data){
    
    try {
        const response =  await fetch(`${process.env.NODE_DEV_URL}/api/verifyPassword`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        });
    
        const responseData =await response.json();
        return responseData;
    } catch (error) {
        console.log('Error',error);
    }
}

export async function registerUserApi(data){
    try {
        const response = await fetch(`${process.env.REACT_APP_URL}/api/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });
        const respData = await response.json();
        return respData;
    } catch (error) {
        console.log(error);
        return;
    }
}