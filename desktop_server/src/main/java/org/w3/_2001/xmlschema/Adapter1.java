//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.3.2 
// See <a href="https://javaee.github.io/jaxb-v2/">https://javaee.github.io/jaxb-v2/</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2021.04.22 at 04:12:50 PM CDT 
//


package org.w3._2001.xmlschema;

import javax.xml.bind.annotation.adapters.XmlAdapter;

public class Adapter1
    extends XmlAdapter<String, Double>
{


    public Double unmarshal(String value) {
        return new Double(value);
    }

    public String marshal(Double value) {
        if (value == null) {
            return null;
        }
        return value.toString();
    }

}