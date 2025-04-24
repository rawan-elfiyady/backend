const supabase = require("../backend/Config/supabaseClient");

async function testSignUp() {
    try {
      const email = 'rawanelfiyady@gmail.com'; // Test email
      const password = 'strongpassword123'; // Test password
      const name = 'Alice'; // User name
      const role = 'patient'; // User role (for metadata)
  
      console.log(`Attempting to sign up user with email: ${email}`);
      
      // Debugging: Log the exact object you're sending to Supabase
      const signUpResponse = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
            name
          }
        }
      });
  
      if (signUpResponse.error) {
        console.error('Error creating user:', signUpResponse.error.message);
      } else {
        console.log('User created successfully:', signUpResponse.user);
      }
    } catch (error) {
      console.error('Unexpected error occurred:', error.message);
    }
  }
  
  // Call the function to test the sign up
  testSignUp();
