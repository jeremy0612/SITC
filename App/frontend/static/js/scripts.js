function toUnicodeEscape(input) {
    const str = String(input)
    return str.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code > 127) {
            return '\\u' + code.toString(16).padStart(4, '0');
        }
        return char;
    }).join('');
}
document.addEventListener('DOMContentLoaded', () => {
    let token = localStorage.getItem('token');

    const showPage = (pageId) => {
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = 'none';
        });
        document.getElementById(pageId).style.display = 'block';
    };

    if (token) {
        showPage('home-page');
    } else {
        showPage('login-page');
    }

    document.getElementById('show-signup').addEventListener('click', (event) => {
        event.preventDefault();
        showPage('signup-page');
    });

    document.getElementById('show-login').addEventListener('click', (event) => {
        event.preventDefault();
        showPage('login-page');
    });

    // Login form submission
    document.getElementById('login-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const response = await fetch('http://140.123.102.223:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
             
        });

        const result = await response.json();
        if (result.status === 200) {
            token = result.token;
            localStorage.setItem('token', token);
            showPage('home-page');
        } else {
            alert('Login failed');
        }
    });

    // Sign up form submission
    document.getElementById('signup-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        const response = await fetch('http://140.123.102.223:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
             
        });

        const result = await response.json();
        if (result.status === 200) {
            alert('Sign up successful. Please login.');
            showPage('login-page');
        } else {
            alert('Sign up failed');
        }
    });

    // Logout
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('token');
        token = null;
        showPage('login-page');
    });

    // Fetch provinces
    document.getElementById('fetch-provinces').addEventListener('click', async () => {
        if (!token) {
            alert('Please login first');
            return;
        }
    
        try {
            const response = await fetch('http://140.123.102.223:5000/provinces', {  // Use the correct endpoint
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const provinces = await response.json();
            document.getElementById('provinces-result').innerText = JSON.stringify(provinces, null, 2);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch');
        }
    });
    

    // Fetch districts by province code
    document.getElementById('district-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!token) {
            alert('Please login first');
            return;
        }

        const provinceCode = document.getElementById('province-code').value;
        const response = await fetch(`http://140.123.102.223:5000/districts?province_code=${provinceCode}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const districts = await response.json();
        document.getElementById('districts-result').innerText = JSON.stringify(districts, null, 2);
    });

    // Fetch wards by district code
    document.getElementById('ward-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!token) {
            alert('Please login first');
            return;
        }

        const districtCode = document.getElementById('district-code').value;
        const response = await fetch(`http://140.123.102.223:5000/wards?district_code=${districtCode}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        const wards = await response.json();
        document.getElementById('wards-result').innerText = JSON.stringify(wards, null, 2);
    });
    // Download image
    document.getElementById('download-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!token) {
            alert('Please login first');
            return;
        }

        const download_province = toUnicodeEscape(document.getElementById('download-province').value);
        const download_district = toUnicodeEscape(document.getElementById('download-district').value);
        const download_ward = toUnicodeEscape(document.getElementById('download-ward').value);
        const download_wardCode = toUnicodeEscape(document.getElementById('download-ward-code').value);

        console.log("download_province:", download_province);
        console.log("download_district:", download_district);
        console.log("download_ward:", download_ward);
        console.log("download_ward Code:", download_wardCode);
        
        document.getElementById('download-result').innerText = 'Downloading...';

        const bodyData = { province: download_province, district: download_district, ward: download_ward, wardCode: download_wardCode };
        const bodyString = JSON.stringify(bodyData).replace(/\\\\/g, "\\");
        console.log(bodyString);
        try {
            const response = await fetch('http://140.123.102.223:5000/download_img', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: bodyString
            });

            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                document.getElementById('download-result').innerText = 'Image downloaded successfully !!!';
            }
            // const result = await response.json();
            // document.getElementById('download-result').innerText = JSON.stringify(result, null, 2);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch');
        }
    });

    // Run inference
    document.getElementById('inference-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!token) {
            alert('Please login first');
            return;
        }
    
        const inference_province = toUnicodeEscape(document.getElementById('inference-province').value);
        const inference_district = toUnicodeEscape(document.getElementById('inference-district').value);
        const inference_ward = toUnicodeEscape(document.getElementById('inference-ward').value);
        const inference_wardCode = document.getElementById('inference-ward-code').value;
    
        console.log("download_province:", inference_province);
        console.log("download_district:", inference_district);
        console.log("download_ward:", inference_ward);
        console.log("download_ward Code:", inference_wardCode);

        document.getElementById('inference-result').innerText = 'Running inference...';
        
        const bodyData = { province: inference_province, district: inference_district, ward: inference_ward, wardCode: inference_wardCode };
        const bodyString = JSON.stringify(bodyData).replace(/\\\\/g, "\\");
        console.log(bodyString);
        
        try {
            const response = await fetch('http://140.123.102.223:5000/get_inference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body:  bodyString
            });
    
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                document.getElementById('inference-result').innerText = 'Inference completed successfully !!!';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch');
        }
    });
    // Get area
    document.getElementById('area-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!token) {
            alert('Please login first');
            return;
        }

        const province = toUnicodeEscape(document.getElementById('area-province').value);
        const district = toUnicodeEscape(document.getElementById('area-district').value);
        const ward = toUnicodeEscape(document.getElementById('area-ward').value);
        const wardCode = toUnicodeEscape(document.getElementById('area-ward-code').value);

        console.log("Province:", province);
        console.log("District:", district);
        console.log("Ward:", ward);
        console.log("Ward Code:", wardCode);

        document.getElementById('area-result').innerText = 'Getting area...';
        document.getElementById('area-image').src = '';

        const bodyData = { province, district, ward, wardCode };
        const bodyString = JSON.stringify(bodyData).replace(/\\\\/g, "\\");

        try {
            const response = await fetch('http://140.123.102.223:5000/get_area', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: bodyString
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            else {
                document.getElementById('area-result').innerText = 'Area fetched successfully !!!';
                const result = await response.json();
                console.log("Result:", result);
                document.getElementById('area-result').innerText = JSON.stringify(result, null, 2);
                document.getElementById('area-image').src = result.image_url;
            }
        
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch');
        }
    });

});

