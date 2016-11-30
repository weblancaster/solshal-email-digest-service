const _ = require('lodash');

const hasThumbnail = (collection) => {
  if (_.isEmpty(collection.url)) {
    return `&nbsp;`;
  } else {
    return `<img src="${collection.thumbnail}" width="250" height="150" alt="${collection.title}">`;
  }
};

const collectionList = (collections) => {
  let list = ``;

  if (collections.length > 0) {
    _.forEach(collections, (collection) => {
      list += `
      <!-- / Half block -->
    <table class="container half-block" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-top: 25px;">
      <tr>
        <td>
          <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr style="margin: 10px 0;">
              <td class="half-block__image" width="5%">
                ${hasThumbnail(collection)}
              </td>

              <td class="half-block__content" style="width: 50%; padding: 0 20px 0 20px; font-size: 16px; line-height: 27px; color: #969696; text-align: left;">
                <p>${collection.original.description}</p>
                <a href="${collection.url}" target="_blank" title="read more">read more</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!-- /// Half block -->
    `
    });

    return list;

  } else {
    return `
    <!-- / Half block -->
    <table class="container half-block" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-top: 25px;">
      <tr>
        <td>
          <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr style="margin: 10px 0;">
              <td class="half-block__content" style="width: 50%; padding: 0 20px 0 20px; font-size: 16px; line-height: 27px; color: #969696; text-align: center;">
                You haven't bookmarked any link yet.
                <a href="http://www.solshal.com" target="_blank" title="Solshal - modern, secure bookmarking">Start now</a> and receive a reminder of what you bookmarked during the week.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!-- /// Half block -->
    `;
  }
};

const digestTemplate = (user) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Weekly digest</title>
  <style type="text/css">
    /* ----- Custom Font Import ----- */

    @import url(https://fonts.googleapis.com/css?family=Work+Sans:400,300,700);
    /* ----- Text Styles ----- */

    table {
      font-family: 'Work Sans', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-font-smoothing: antialiased;
      font-smoothing: antialiased;
    }

    @media only screen and (max-width: 700px) {
      /* ----- Base styles ----- */
      .full-width-container {
        padding: 0 !important;
      }
      .container {
        width: 100% !important;
      }
      /* ----- Header ----- */
      .header td {
        padding: 30px 15px 30px 15px !important;
      }
      /* ----- Half block ----- */
      .half-block {
        display: block !important;
      }
      .half-block tr {
        display: block !important;
      }
      .half-block td {
        display: block !important;
      }
      .half-block__image {
        text-align: center;
        width: 100% !important;
      }
      .half-block__content {
        width: 100% !important;
        box-sizing: border-box;
        padding: 20px 15px 20px 15px !important;
      }
      /* ----- Hero subheader ----- */
      .hero-subheader__title {
        padding: 80px 15px 15px 15px !important;
        font-size: 35px !important;
      }
      .hero-subheader__content {
        padding: 0 15px 90px 15px !important;
      }
      /* ----- Title block ----- */
      .title-block {
        padding: 0 15px 0 15px;
      }
      /* ----- Paragraph block ----- */
      .paragraph-block__content {
        padding: 25px 15px 18px 15px !important;
      }
    }
  </style>

  <!--[if gte mso 9]><xml>
			<o:OfficeDocumentSettings>
				<o:AllowPNG/>
				<o:PixelsPerInch>96</o:PixelsPerInch>
			</o:OfficeDocumentSettings>
		</xml><![endif]-->
</head>

<body style="padding: 0; margin: 0;" bgcolor="#eeeeee">
  <span style="color:transparent !important; overflow:hidden !important; display:none !important; line-height:0px !important; height:0 !important; opacity:0 !important; visibility:hidden !important; width:0 !important; mso-hide:all;">Hey ${user.name} here is your weekly bookmarks digest.</span>

  <!-- / Full width container -->
  <table class="full-width-container" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" bgcolor="#eeeeee"
    style="width: 100%; height: 100%; padding: 30px 0 30px 0;">
    <tr>
      <td align="center" valign="top">
        <!-- / 700px container -->
        <table class="container" border="0" cellpadding="0" cellspacing="0" width="700" bgcolor="#ffffff" style="width: 700px;">
          <tr>
            <td align="center" valign="top">
              <!-- / Header -->
              <table class="container header" border="0" cellpadding="0" cellspacing="0" width="620" style="width: 620px;">
                <tr>
                  <td style="padding: 30px 0 30px 0; border-bottom: solid 1px #eeeeee;" align="left">
                    <a href="#" style="font-size: 30px; text-decoration: none; color: #000000;">SOLSHAL</a>
                  </td>
                </tr>
              </table>
              <!-- /// Header -->

              <!-- / Hero subheader -->
              <table class="container hero-subheader" border="0" cellpadding="0" cellspacing="0" width="620" style="width: 620px;">
                <tr>
                  <td class="hero-subheader__title" style="font-size: 43px; font-weight: bold; padding: 60px 0 15px 0;" align="left">Hey ${user.name}</td>
                </tr>

                <tr>
                  <td class="hero-subheader__content" style="font-size: 16px; line-height: 27px; color: #969696; padding: 0 60px 30px 0;" align="left">Here is your weekly reminder of the links you have bookmarked during this week. Good reading!</td>
                </tr>
              </table>
              <!-- /// Hero subheader -->

              <!-- / Title -->
              <table class="container title-block" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" valign="top">
                    <table class="container" border="0" cellpadding="0" cellspacing="0" width="620" style="width: 620px;">
                      <tr>
                        <td style="border-bottom: solid 1px #eeeeee; padding: 35px 0 18px 0; font-size: 26px;" align="left">Latest bookmarks</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <!-- /// Title -->

              ${collectionList(user.collections)}

              <!-- / Divider -->
              <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-top: 25px;" align="center">
                <tr>
                  <td align="center">
                    <table class="container" border="0" cellpadding="0" cellspacing="0" width="620" align="center" style="border-bottom: solid 1px #eeeeee; width: 620px;">
                      <tr>
                        <td align="center">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <!-- /// Divider -->

              <!-- / Footer -->
              <table class="container" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                <tr>
                  <td align="center">
                    <table class="container" border="0" cellpadding="0" cellspacing="0" width="620" align="center" style="width: 620px;">
                      <tr>
                        <td style="color: #d5d5d5; text-align: center; font-size: 15px; padding: 10px 0 60px 0; line-height: 22px;">Copyright &copy; 2016 <a href="http://solshal.com/" target="_blank" style="text-decoration: none; border-bottom: 1px solid #d5d5d5; color: #d5d5d5;">Solshal</a>.
                          <br />All rights reserved.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <!-- /// Footer -->
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>

</html>
  `
};

module.exports = digestTemplate;