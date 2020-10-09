import javax.servlet.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class AreaCheckServlet extends HttpServlet {
    public void init(){
        try {
            super.init();
            ServletContext context = getServletContext();
            context.setAttribute("list", new ArrayList<Point>());
        } catch (ServletException e) {
            e.printStackTrace();
        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-Type", "text/html; charset=UTF-8");
        PrintWriter out = response.getWriter();
        response.setContentType("text/html");

        ServletContext context = request.getServletContext();
        ArrayList<Point> list = (ArrayList<Point>) context.getAttribute("list");

        String xS = (String) context.getAttribute("X");

        double x = Double.parseDouble(xS);
        double y = Double.parseDouble((String) context.getAttribute("Y"));
        double r = Double.parseDouble((String) context.getAttribute("R"));

        out.print("<!DOCTYPE html> \n" +
                "<html> \n" +
                "<head> \n" +
                "<meta charset='UTF-8'> <title>Points</title> \n" +
                "<link rel='stylesheet' type='text/css' href='main.css'> \n" +
                "</head> \n" +
                "<body style='background-image: none'> <div style=\"text-align: center;\"> \n" +
                "<div class='container' style='padding:20px 0;'> \n");

        if (x < -3 || x > 5 || r < 1 || r > 5 || y < -3 || y > 5) {
            out.println("Полученные значения некоректны \n" +
                    "</body> </html>");
        } else {
            Point p = new Point(x, y, r);
            p.isInArea = checkArea(p.X, p.Y, p.R);
            list.add(p);

            out.println(
                    "<br> <table class='points'> \n" +
                    "<tr> \n" +
                    "<td>X</td> \n" +
                    "<td>Y</td> \n" +
                    "<td>R</td> \n" +
                    "<td>Попадает</td> \n" +
                    "</tr>");

            for (Point point : list) {
                out.println("<tr> \n" +
                        "<td>" + point.X + "</td> \n" +
                        "<td>" + point.Y + "</td> \n" +
                        "<td>" + point.R + "</td> \n" +
                        "<td>");

                if (checkArea(point.X, point.Y, point.R)) {
                    out.print("Да!");
                    list.get(list.size() - 1).isInArea = true;
                } else {
                    out.print("Нет!");
                    list.get(list.size() - 1).isInArea = false;
                }

                out.print("</td> \n " +
                        "</tr>");
            }

            out.println("</table> </body> </html>");
        }
    }

    public class Point {
        double X;
        double Y;
        double R;
        boolean isInArea;
        Point(double x, double y, double r){
            this.X = x;
            this.Y = y;
            this.R = r;
        }
    }

    public static boolean checkArea(double x, double y, double R){
        if(x >= 0 && y >= 0 && x <= R/2 && y <= R){
            return true;
        }
        if(x <= 0 && y>=0 && x*x + y*y <= R*R){
            return true;
        }
        return x <= 0 && y <= 0 && x + y >= -R;
    }
}
