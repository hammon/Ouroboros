package utils;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Collection;

import org.apache.commons.io.FileUtils;

public class EncodingUtils {

	public static void changeEncoding(File source, String srcEncoding, File target, String tgtEncoding) throws IOException {
	    BufferedReader br = null;
	    BufferedWriter bw = null;
	    try{
	        br = new BufferedReader(new InputStreamReader(new FileInputStream(source),srcEncoding));
	        bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(target), tgtEncoding));
	        char[] buffer = new char[16384];
	        int read;
	        while ((read = br.read(buffer)) != -1)
	            bw.write(buffer, 0, read);
	    } finally {
	        try {
	            if (br != null)
	                br.close();
	        } finally {
	            if (bw != null)
	                bw.close();
	        }
	    }
	}
	
	public static void koi8rToutf8(File source){
		File koi8r = new File(source.getAbsoluteFile() + ".koi8r");
		try {
			FileUtils.copyFile(source, koi8r);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		try {
			FileUtils.forceDelete(source);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		try {
			changeEncoding(koi8r, "KOI8-R", source, "UTF-8");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void koi8DirToUtf8(File dir, String fileExtension){
		
		String[] extensions = {fileExtension};
		
		Collection<File> files = FileUtils.listFiles(dir, extensions, true);
		
		for(File f : files){
			koi8rToutf8(f);
		}
		
	}
}
