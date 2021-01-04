using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PandaProje.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult FormSayfasi()
        {
            ViewBag.Message = "";

            return View();
        }

        public ActionResult SupportSayfasi()
        {
            ViewBag.Message = "";

            return View();
        }
    }
}