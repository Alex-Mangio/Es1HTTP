package server;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

public class Main {
    public static void main(String[] args) throws IOException {
        File file;
        ServerSocket ss = new ServerSocket(8080);
        do {
            Socket s = ss.accept();
            BufferedReader in = new BufferedReader(new InputStreamReader(s.getInputStream()));
            DataOutputStream out = new DataOutputStream(s.getOutputStream());

            String firstLine = in.readLine();
            System.out.println(firstLine);

            String[] arrayRequest = firstLine.split(" ");
            String method = arrayRequest[0];
            String resource = arrayRequest[1];
            String version = arrayRequest[2];

            String header;
            do {
                header = in.readLine();
                System.out.println(header);
            } while (!header.isEmpty());

            if (resource.equals("/")) {
                resource = "/index.html";
            }
            file = new File("firstProgectJS" + resource);
            

            if (file.exists()) {
                // String msg = "<b>Benvenuto nella pagina html</b>";
                out.writeBytes("HTTP/1.1 200 OK" + "\n");
                out.writeBytes("Content-Lenght" + file.length() + "\n");
                out.writeBytes("Content-Type:" + getTypeOfFile(file) + "\n");
                out.writeBytes("\n");
                // out.writeBytes(msg);
                InputStream input = new FileInputStream(file);
                byte[] buf = new byte[8192];
                int n;
                while ((n = input.read(buf)) != -1) {
                    out.write(buf, 0, n);
                }
                input.close();

            } else {
                String msg = "<b>Pagina non trovata</b>";
                out.writeBytes("HTTP/1.1 404 NOT FOUND" + "\n");
                out.writeBytes("Content-Lenght" + msg.length() + "\n");
                out.writeBytes("Content-Type: text/html\n");
                out.writeBytes("\n");
                out.writeBytes(msg);

            }

            s.close();

        } while (true);

    }

    public static String getTypeOfFile(File file) {
        String[] s = file.getName().split("//.");
        String tipo = s[s.length - 1];
        switch (tipo) {
            case "html":
            case "htm":
                return "text/html";
            case "css":
                return "text/css";
            case "image":
                return "image/png";
            case "js":
                return "application/js";
            default:
                return "";
        }
    }
}