export const accountConfirmationEmail = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Worksfair Email Confirmation</title>
  </head>
  <body style="background-color: #eee; padding:30px 0; font-family: Arial">
    <div style=" margin: 50px auto; width: 400px; background-color: white;padding: 20px;color: rgb(90, 89, 89); border-radius: 5px;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.10); transition: all 0.3s cubic-bezier(.25,.8,.25,1)">
      <h2 style="text-align: center"><span style="color:#209cee;">WORKS</span><span style="color:#ff3860;">FAIR</span><small>.com</small></h2>
      <p style="text-align: center; margin-top: -15px; font-size: 14px"><i>The platform for growing businesses...</i></p>
        <div style="margin-bottom: 40px; margin-top: 40px;">
          <h4>Email Confirmation</h4>
          <p style="line-height:1.5">Please confirm your email account by clicking the link below to start using Worksfair.com</p>
        </div>
        <div style="width:100%">
          <a href="{url}" target="_blank" style="background-color: #209cee; padding: 10px 20px; border-radius: 30px; color: white; text-decoration-line: none; display: block; text-align: center;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.10); transition: all 0.3s cubic-bezier(.25,.8,.25,1);">Confirm Account</a>
        </div>
        <p>
          <small>If the button does not work, please use the link below on your browser.</small>
        </p>
        <p><a href="{url}">{url}</a> </p>
    </div>
  </body>
</html>`;

export const passwordResetEmail = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Worksfair Password Reset</title>
  </head>
  <body style="background-color: #eee; padding:30px 0; font-family: Arial">
    <div style=" margin: 50px auto; width: 400px; background-color: white;padding: 20px;color: rgb(90, 89, 89); border-radius: 5px;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.10); transition: all 0.3s cubic-bezier(.25,.8,.25,1)">
      <h2 style="text-align: center"><span style="color:#209cee;">WORKS</span><span style="color:#ff3860;">FAIR</span><small>.com</small></h2>
      <p style="text-align: center; margin-top: -15px; font-size: 14px"><i>The platform for growing businesses...</i></p>
        <div style="margin-bottom: 40px; margin-top: 40px;">
          <h4>Password Reset</h4>
          <p style="line-height:1.5">Please reset your password by clicking the button below</p>
        </div>
        <div style="width:100%">
          <a href="{url}" target="_blank" style="background-color: #209cee; padding: 10px 20px; border-radius: 30px; color: white; text-decoration-line: none; display: block; text-align: center;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.10); transition: all 0.3s cubic-bezier(.25,.8,.25,1);">Confirm Account</a>
        </div>
        <p>
          <small>If the button does not work, please copy and use the link below on your browser.</small>
        </p>
        <p><a href="{url}">{url}</a> </p>
    </div>
  </body>
</html>`;
