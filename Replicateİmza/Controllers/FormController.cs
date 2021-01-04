using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace PandaProje.Controllers
{
    public class FormController : Controller
    {

        // GET: Form
        public ActionResult Index()
        {

            return View();
        }
        [HttpPost]
        public ActionResult PandaForm1(string firstname, string lastname, string workemail, string phone, string companyname, string companysize)
        {
            string conString = @"ConnString";
            SqlConnection baglanti = new SqlConnection(conString);
            try
            {
                if (baglanti.State == ConnectionState.Closed)
                    baglanti.Open();
                // Bağlantımızı kontrol ediyoruz, eğer kapalıysa açıyoruz.
                string kayit = "insert into pandatablo(firstname,lastname,workemail,phone,companyname,companysize) values (@firstname,@lastname,@workemail,@phone,@companyname,@companysize)";
                // müşteriler tablomuzun ilgili alanlarına kayıt ekleme işlemini gerçekleştirecek sorgumuz.
                SqlCommand komut = new SqlCommand(kayit, baglanti);
                //Sorgumuzu ve baglantimizi parametre olarak alan bir SqlCommand nesnesi oluşturuyoruz.
                komut.Parameters.AddWithValue("@firstname", firstname);
                komut.Parameters.AddWithValue("@lastname", lastname);
                komut.Parameters.AddWithValue("@workemail", workemail);
                komut.Parameters.AddWithValue("@phone", phone);
                komut.Parameters.AddWithValue("@companyname", companyname);
                komut.Parameters.AddWithValue("@companysize", companysize);


                //Parametrelerimize Form üzerinde ki kontrollerden girilen verileri aktarıyoruz.
                komut.ExecuteNonQuery();
                //Veritabanında değişiklik yapacak komut işlemi bu satırda gerçekleşiyor.
                baglanti.Close();

            }
            catch (Exception hata)
            {
            }
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            var mail = new MailMessage();
            mail.From = new MailAddress("a.yilmaz0852@gmail.com");
            mail.To.Add(workemail);
            mail.Subject = "dosya gönderme";
            mail.IsBodyHtml = true;
            string htmlBody;
            htmlBody = "MailBody";
            mail.Body = htmlBody;
            Attachment attachment;
            attachment = new Attachment(@"Atılacak Dosya Uzantısı");
            mail.Attachments.Add(attachment);
            SmtpServer.Port = 587;
            SmtpServer.UseDefaultCredentials = false;
            SmtpServer.Credentials = new System.Net.NetworkCredential("a.yilmaz0852@gmail.com", "mail_şifresi");
            SmtpServer.EnableSsl = true;
            SmtpServer.Timeout = int.MaxValue;
            SmtpServer.Send(mail);
            return RedirectToAction("FormSayfasi", "Home");


        }
    }
}