# Cyber Security

Using a free website called [Try Hack Me](https://tryhackme.com/) to learn the basics.

## Sites

- [Open Worldwide Application Security Project (OWASP)](https://owasp.org/)
	- Used solely to test the security of web applications and services.

## Tools

Below are some tools of the trade mentioned on TryHackMe.

- GoBuster
	- Command line security app
	- `gobuster -u http://fakebank.com -w wordlist.txt dir` for example to scan for hidden pages using a wordlist.
- Metasploit
	- exploitation tool
- [AbuseIPDB](https://www.abuseipdb.com/)
	- Find abusive IPs
- [Cisco Talos Intelligence](https://www.talosintelligence.com/)
	- Find abusive IPs, domains, and network owners.
- [NMap](https://nmap.org/)
	- Network Mapper

### NMap

- `nmap 192.168.1.1`: At its simplest, an Nmap command can be a scan of a single host. This command scans the host at IP address 192.168.1.1 for open ports and services. This is often the first step in network exploration, providing a quick overview of the target's open ports and services.
- `nmap -p 1-100 192.168.1.1`: This command is a bit more specific. It scans the first 100 ports on the host. You can adjust the range as needed, allowing for targeted scanning of ports based on your requirements. This is particularly useful when you're interested in a specific range of ports.
- `nmap -sV 192.168.1.1`: This command performs a service scan. It not only checks for open ports but also tries to determine the service running on each port. This is a crucial step in network exploration as it provides more detailed information about the target, including the versions of the services running on open ports.
- `nmap -A 192.168.1.1`: This command is like a Swiss Army knife. It enables OS and version detection, script scanning, and traceroute, providing a comprehensive view of the target. This is a powerful command that can provide a wealth of information about a target host, making it a favorite among many Nmap users.
- `nmap -p- -sS -T4 192.168.1.1`: This command is for those who want to leave no stone unturned. It performs a stealth SYN scan (-sS) on all 65535 ports (-p-) with an aggressive timing option (-T4). This is a more aggressive and comprehensive scan that can provide a complete picture of a target's open ports. However, its aggressive nature means it may be detected by intrusion detection systems, so it should be used with caution.
- `nmap --script=vuln 192.168.1.1`: This command is a prime example of the power of Nmap's scripting engine. It checks for known vulnerabilities on the host, running a variety of vulnerability scanning scripts against the target. This can be incredibly useful for identifying potential security risks on a host.

## Terms

-  Security Operations Center (SOC) 
- Security Information and Event Management (SIEM)
- Potentially Unwanted Program (PUP) or Potentially Unwanted Application (PUA)
	- bundleware
	- junkware
	- annoying stuff in general
- **Smishing** (SMS phishing)
- **Vishing** generally uses voice to trick users.
- **Whaling** is a highly targeted phishing attack - aimed at senior executives - masquerading as a legitimate email.
- **Pharming** is the criminal act of producing a fake website and then redirecting users to it.
- **Spear phishing** is an email or electronic communications scam targeted towards a specific individual, organization or business.
- Spam over Internet Telephone (SPIT)
- Spam over Instant Messaging (SPIM)
- **Bluesnarfing** is the unauthorized access of information from a wireless device through a Bluetooth connection

## Frameworks

The importance of cybersecurity frameworks cannot be overstated. Here are some reasons why they are essential. Content from [The Final Hop](https://www.thefinalhop.com/understanding-cybersecurity-frameworks-nist-iso-and-more/).

1. **Risk Management**: Cybersecurity frameworks provide a systematic approach to managing security risks. By following these frameworks, organizations can identify their most significant risks and implement appropriate controls to mitigate them.
2. **Compliance**: Many industries have regulations that require certain security controls and measures. Utilizing a recognized cybersecurity framework can help organizations meet these regulatory requirements and avoid potential fines or sanctions.
3. **Standardization**: Cybersecurity frameworks offer a common language and set of standards that all organizations can adhere to. This standardization makes it easier for businesses to communicate about cybersecurity risks and controls with stakeholders, including employees, customers, partners, and regulators.
4. **Trust and Reputation**: Demonstrating adherence to a recognized cybersecurity framework can enhance an organization's reputation. It shows customers, partners, and stakeholders that the organization takes cybersecurity seriously and has taken steps to secure its systems and data.
5. **Incident Response**: Cybersecurity frameworks typically include guidelines for responding to and recovering from cyber incidents. This ensures organizations are prepared for potential cyber threats and can respond effectively when incidents occur.

- National Institute of Standards and Technology (NIST)
- International Organization for Standardization (ISO)
- International Electrotechnical Commission (IEC)
- Center for Internet Security (CIS) Controls
- Control Objectives for Information and Related Technologies (COBIT)
- Payment Card Industry Data Security Standard (PCI DSS)

## Walking An Application

- **View Source**: Use your browser to view the human-readable source code of a website.
- **Inspector**: Learn how to inspect page elements and make changes to view usually blocked content.
- **Debugger**: Inspect and control the flow of a page's JavaScript
- **Network**: See all the network requests a page makes.

## DNS Records

- **A Record**: These records resolve to IPv4 addresses, for example 104.26.10.229
- **AAAA Record**: These records resolve to IPv6 addresses, for example 2606:4700:20::681a:be5
- **CNAME Record**: These records resolve to another domain name, for example, TryHackMe's online shop has the subdomain name store.tryhackme.com which returns a CNAME record shops.shopify.com. Another DNS request would then be made to shops.shopify.com to work out the IP address.
- **MX Record**: These records resolve to the address of the servers that handle the email for the domain you are querying, for example an MX record response for tryhackme.com would look something like alt1.aspmx.l.google.com. These records also come with a priority flag. This tells the client in which order to try the servers, this is perfect for if the main server goes down and email needs to be sent to a backup server.
- **TXT Record**: TXT records are free text fields where any text-based data can be stored. TXT records have multiple uses, but some common ones can be to list servers that have the authority to send an email on behalf of the domain (this can help in the battle against spam and spoofed email). They can also be used to verify ownership of the domain name when signing up for third party services.