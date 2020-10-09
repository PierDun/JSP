import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        ServletContext context = request.getServletContext();
        String xString = request.getParameter("X");
        String yString = request.getParameter("Y");
        String rString = request.getParameter("R");
        if (isNumeric(xString) && isNumeric(yString) && isNumeric(rString)) {
            response.setHeader("Content-Type", "text/html; charset=UTF-8");
            if (xString == null || yString == null || rString == null) {
                RequestDispatcher dispatcher = context.getRequestDispatcher("/index.jsp");
                dispatcher.forward(request, response);
            } else {
                context.setAttribute("X", xString);
                context.setAttribute("Y", yString);
                context.setAttribute("R", rString);
                request.getServletContext().getRequestDispatcher("/check").forward(request, response);
            }
        } else {
            RequestDispatcher dispatcher = context.getRequestDispatcher("/index.jsp");
            dispatcher.forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) { }

    private boolean isNumeric(String str)
    {
        try
        {
            double d = Double.parseDouble(str);
        }
        catch(NumberFormatException nfe)
        {
            return false;
        }
        return true;
    }
}