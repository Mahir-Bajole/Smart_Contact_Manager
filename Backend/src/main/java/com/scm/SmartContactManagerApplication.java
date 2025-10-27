package com.scm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;

@SpringBootApplication
public class SmartContactManagerApplication {

	public static void main(String[] args) throws NoSuchAlgorithmException, KeyManagementException {
		SpringApplication.run(SmartContactManagerApplication.class, args);


		TrustManager[] trustAllCertificates = new TrustManager[]{
				new X509TrustManager() {
					public X509Certificate[] getAcceptedIssuers() {
						return null;
					}
					public void checkClientTrusted(X509Certificate[] certs, String authType) {}
					public void checkServerTrusted(X509Certificate[] certs, String authType) {}
				}
		};
		SSLContext sc = SSLContext.getInstance("TLS");
		sc.init(null, trustAllCertificates, new java.security.SecureRandom());
		HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());

		// Optional: disable hostname verification too
		HttpsURLConnection.setDefaultHostnameVerifier((hostname, session) -> true);
	}

}
