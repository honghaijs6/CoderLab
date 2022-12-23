const EMAIL_TEMPLATE = `<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <style type="text/css">
    body {
      font-size: 14px;
      font-family: Arial, Helvetica, sans-serif;
      box-sizing: content;
    }
    .container {
      max-width: 500px;
      margin: auto;
      margin-top: 5%;
      border: 1px solid #dddddd;
      border-radius: 9px;
    }
    .header {
      border-bottom: 1px solid #dddddd;
      padding: 25px;
      text-align: center;
      font-size: 30px;
      color: #e06241;
    }
    .header .logo {
      height: 50px;
    }
    .content {
      padding: 50px;
      line-height: 24px;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #999999;
      line-height: 22px;
      text-align: center;
    }
    .btn {
      padding: 10px 25px;
      background: #03a9f4;
      color: #fff;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
    }
    .btn a {
      color: #fff;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      CoderLab
    </div>
    <div class="content">
      Hi ,{{FULLNAME}} <br />
      <br />
      <p>
        {{SENDER_NAME}} on CoderLab kindly invites you to participate in a
        live coding session
      </p>

      <div style="margin-top: 30px;">
        by clicking the link for Joining CoderLab live code session
        <a target="_blank" href="{{LINK}}">Link join CoderLab </a>
      </div>

    
      <p style="padding-top: 20px;">
        Best regards. <br />
        CoderLab Team
      </p>
    </div>
  </div>
  <div class="footer">
    CoderPush <br />
    Thảo Điền, Distric 2, HCM City, Viet Nam
  </div>
</body>
</html>
`;

export default EMAIL_TEMPLATE;
