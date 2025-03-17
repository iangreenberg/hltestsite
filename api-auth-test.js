// Simple utility to test the authentication API endpoints
const testAuth = async () => {
  try {
    console.log('Starting API authentication tests...');
    
    // 1. Check current user status (should be not authenticated)
    console.log('\n1. Testing GET /api/user - Should return 401 if not logged in');
    try {
      const userResponse = await fetch('/api/user');
      console.log(`Status: ${userResponse.status}`);
      if (userResponse.status === 401) {
        console.log('✅ Test passed: Not authenticated');
      } else {
        console.log('❌ Test failed: Expected 401 status code');
        const userData = await userResponse.json();
        console.log('User data:', userData);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    }

    // 2. Try to log in with invalid credentials
    console.log('\n2. Testing POST /api/login with invalid credentials - Should fail');
    try {
      const invalidLoginResponse = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'wronguser', password: 'wrongpass' })
      });
      console.log(`Status: ${invalidLoginResponse.status}`);
      if (invalidLoginResponse.status === 401) {
        console.log('✅ Test passed: Invalid login rejected');
      } else {
        console.log('❌ Test failed: Expected 401 status code');
        try {
          const responseData = await invalidLoginResponse.json();
          console.log('Response:', responseData);
        } catch (e) {
          console.log('No JSON response');
        }
      }
    } catch (error) {
      console.error('Error during invalid login:', error);
    }

    // 3. Try to log in with admin credentials
    console.log('\n3. Testing POST /api/login with admin credentials - Should succeed');
    try {
      const loginResponse = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'admin123' })
      });
      console.log(`Status: ${loginResponse.status}`);
      
      if (loginResponse.status === 200) {
        console.log('✅ Test passed: Login successful');
        const userData = await loginResponse.json();
        console.log('User data:', userData);
      } else {
        console.log('❌ Test failed: Login unsuccessful');
        try {
          const error = await loginResponse.text();
          console.log('Error:', error);
        } catch (e) {
          console.log('No response text');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }

    // 4. Check current user status again (should be authenticated now)
    console.log('\n4. Testing GET /api/user after login - Should return user data');
    try {
      const userResponse = await fetch('/api/user');
      console.log(`Status: ${userResponse.status}`);
      
      if (userResponse.status === 200) {
        console.log('✅ Test passed: User authenticated');
        const userData = await userResponse.json();
        console.log('User data:', userData);
      } else {
        console.log('❌ Test failed: Expected 200 status code');
        try {
          const error = await userResponse.text();
          console.log('Error:', error);
        } catch (e) {
          console.log('No response text');
        }
      }
    } catch (error) {
      console.error('Error checking user after login:', error);
    }

    // 5. Test logout
    console.log('\n5. Testing POST /api/logout - Should succeed');
    try {
      const logoutResponse = await fetch('/api/logout', { method: 'POST' });
      console.log(`Status: ${logoutResponse.status}`);
      
      if (logoutResponse.status === 200) {
        console.log('✅ Test passed: Logout successful');
      } else {
        console.log('❌ Test failed: Logout unsuccessful');
        try {
          const error = await logoutResponse.text();
          console.log('Error:', error);
        } catch (e) {
          console.log('No response text');
        }
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }

    // 6. Check user status one more time (should be logged out)
    console.log('\n6. Testing GET /api/user after logout - Should return 401');
    try {
      const finalUserResponse = await fetch('/api/user');
      console.log(`Status: ${finalUserResponse.status}`);
      
      if (finalUserResponse.status === 401) {
        console.log('✅ Test passed: User logged out');
      } else {
        console.log('❌ Test failed: Expected 401 status code');
        try {
          const userData = await finalUserResponse.json();
          console.log('User data (should be empty):', userData);
        } catch (e) {
          console.log('No JSON response');
        }
      }
    } catch (error) {
      console.error('Error checking user after logout:', error);
    }

    console.log('\nAuth API Testing completed!');
  } catch (error) {
    console.error('Unhandled error during API test:', error);
  }
};

// Run tests
testAuth();