import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { OrderDomainDto, RegisterDomainDto, SearchDomainDto } from './dto/domain.dto';
import { createHmac } from 'node:crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Domain } from './entities/domain.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class DomainService {
  constructor(@InjectRepository(Domain) private readonly domainRepo: Repository<Domain>, @InjectRepository(User) private readonly userRepo: Repository<User>) { }

  async findAll() {
    try {
      const domains = await this.domainRepo.find()
      return { message: "Domains retrieved successfully", result: domains }
    } catch (error) {
      throw error
    }
  }

  async search(dto: SearchDomainDto) {
    try {
      const url = 'https://www.whoisxmlapi.com/whoisserver/WhoisService';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          domainName: dto.name,
          apiKey: process.env.WHOIS_API_KEY,
          outputFormat: "JSON",
          da: 1
        })
      };

      const response = await fetch(url, options);
      const result = await response.json();
      if (result.WhoisRecord.domainAvailability === "AVAILABLE") {
        const tld = dto.name.split(".")[1]
        const pricingUrl = `${process.env.GO54_ENDPOINT}/tlds/pricing?lockstatus=true`;

        const pricingResponse = await fetch(pricingUrl, {
          method: "GET",
          headers: this.constructHeader(),
          redirect: "follow"
        })
        const data = await pricingResponse.json()
        if (data.error) throw new BadRequestException(data.error)

        const price = data.find((item: any) => item.tld === `.${tld}` && item.currencyCode === "NGN")
        if (!price) throw new BadRequestException(`TLD '.${tld}' is not supported or has no NGN pricing`)
        const vat = (parseFloat(price.registrationPrice) * 7.5) / 100
        return { status: true, message: "Domain is available", result: { domain: result.WhoisRecord.domainName, price: price.registrationPrice, total: parseFloat(price.registrationPrice) + vat } }
      }

      if (result.WhoisRecord.domainAvailability === "UNAVAILABLE") {
        return { status: false, message: "Domain is taken", result }
      }

      return { status: false, message: "Domain is undetermined", result }
    } catch (error) {
      throw new InternalServerErrorException(`WHOIS lookup failed: ${error.message}`);
    }
  }

  async orderDomain(dto: OrderDomainDto, userId: string) {
    try {
      if (!userId) throw new BadRequestException("User ID is required")

      const user = await this.userRepo.findOne({ where: { id: userId } })
      if (!user) throw new NotFoundException("User not found")

      const newOrder = this.domainRepo.create({
        name: dto.name,
        user: { id: userId },
        registrationPeriod: parseInt(dto.regperiod),
        registrationPrice: dto.price,
      })
      const result = await this.domainRepo.save(newOrder)
      return { message: "Domain registered successfully", result }
    } catch (error) {
      throw error;
    }
  }

  async register(dto: RegisterDomainDto, userId: string) {
    try {
      if (!userId) throw new BadRequestException("User ID is required")

      const user = await this.userRepo.findOne({ where: { id: userId } })
      if (!user) throw new NotFoundException("User not found")

      const url = `${process.env.GO54_ENDPOINT}/order/domains/register`;

      const urlencoded = new URLSearchParams();
      urlencoded.append("domain", dto.name);
      urlencoded.append("regperiod", dto.regperiod);
      urlencoded.append("nameservers[ns1]", "ns1.google.com");
      urlencoded.append("nameservers[ns2]", "ns2.google.com");
      urlencoded.append("contacts[registrant][firstname]", user.firstName);
      urlencoded.append("contacts[registrant][lastname]", user.lastName);
      urlencoded.append("contacts[registrant][fullname]", `${user.firstName} ${user.lastName}`);
      urlencoded.append("contacts[registrant][companyname]", user.companyName);
      urlencoded.append("contacts[registrant][email]", user.email);
      urlencoded.append("contacts[registrant][address1]", user.address);
      urlencoded.append("contacts[registrant][city]", user.city);
      urlencoded.append("contacts[registrant][state]", user.state);
      urlencoded.append("contacts[registrant][zipcode]", user.zipCode);
      urlencoded.append("contacts[registrant][country]", user.country);
      urlencoded.append("contacts[registrant][phonenumber]", user.phoneNumber);
      urlencoded.append("contacts[admin][firstname]", user.firstName);
      urlencoded.append("contacts[admin][lastname]", user.lastName);
      urlencoded.append("contacts[admin][fullname]", `${user.firstName} ${user.lastName}`);
      urlencoded.append("contacts[admin][companyname]", user.companyName);
      urlencoded.append("contacts[admin][email]", user.email);
      urlencoded.append("contacts[admin][address1]", user.address);
      urlencoded.append("contacts[admin][city]", user.city);
      urlencoded.append("contacts[admin][state]", user.state);
      urlencoded.append("contacts[admin][zipcode]", user.zipCode);
      urlencoded.append("contacts[admin][country]", user.country);
      urlencoded.append("contacts[admin][phonenumber]", user.phoneNumber);
      urlencoded.append("contacts[billing][firstname]", user.firstName);
      urlencoded.append("contacts[billing][lastname]", user.lastName);
      urlencoded.append("contacts[billing][fullname]", `${user.firstName} ${user.lastName}`);
      urlencoded.append("contacts[billing][companyname]", user.companyName);
      urlencoded.append("contacts[billing][email]", user.email);
      urlencoded.append("contacts[billing][address1]", user.address);
      urlencoded.append("contacts[billing][city]", user.city);
      urlencoded.append("contacts[billing][state]", user.state);
      urlencoded.append("contacts[billing][zipcode]", user.zipCode);
      urlencoded.append("contacts[billing][country]", user.country);
      urlencoded.append("contacts[billing][phonenumber]", user.phoneNumber);
      urlencoded.append("contacts[tech][firstname]", user.firstName);
      urlencoded.append("contacts[tech][lastname]", user.lastName);
      urlencoded.append("contacts[tech][fullname]", `${user.firstName} ${user.lastName}`);
      urlencoded.append("contacts[tech][companyname]", user.companyName);
      urlencoded.append("contacts[tech][email]", user.email);
      urlencoded.append("contacts[tech][address1]", user.address);
      urlencoded.append("contacts[tech][city]", user.city);
      urlencoded.append("contacts[tech][state]", user.state);
      urlencoded.append("contacts[tech][zipcode]", user.zipCode);
      urlencoded.append("contacts[tech][country]", user.country);
      urlencoded.append("contacts[tech][phonenumber]", user.phoneNumber);

      const response = await fetch(url, {
        method: 'POST',
        headers: this.constructHeader(),
        body: urlencoded,
        redirect: 'follow'
      })
      const result = await response.json()
      if (result.error) throw new BadRequestException(result.error)

      await this.domainRepo.save({
        name: dto.name,
        user: { id: userId },
        registrationPeriod: parseInt(dto.regperiod),
        registrationPrice: result.order?.totalamount ?? 0,
        expiryDate: result.order?.expirydate ?? null,
        checkOutUrl: "",
        status: 'active',
      })
      return { message: "Domain registered successfully", result }
    } catch (error) {
      throw error;
    }
  }

  async findUserDomains(userId: string) {
    try {
      if (!userId) throw new BadRequestException("User ID is required")

      const domains = await this.domainRepo.find({ where: { user: { id: userId } } })
      return { message: "Domains retrieved successfully", result: domains }
    } catch (error) {
      throw error
    }
  }

  async findOneDomain(domainId: string) {
    try {
      if (!domainId) throw new BadRequestException("Domain ID is required")

      const domain = await this.domainRepo.findOne({ where: { id: domainId } })
      if (!domain) throw new NotFoundException("Domain not found")
      return { message: "Domain retrieved successfully", result: domain }
    } catch (error) {
      throw error
    }
  }

  // async renew(dto: SearchDomainDto) {
  //   try {
  //     const price = await this.getPrice(dto.name)
  //     return { message: "Renewal price", result: { domain: dto.name, price: price.renewalPrice } }
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async updateNameservers(domainId: string) {
    try {
      const url = `${process.env.GO54_ENDPOINT}/domains/${domainId}/nameservers`;
      const urlencoded = new URLSearchParams();
      urlencoded.append("ns1", "nsa.whogohost.com");
      urlencoded.append("ns2", "nsb.whogohost.com");

      const response = await fetch(url, {
        method: 'POST',
        headers: this.constructHeader(),
        body: urlencoded,
        redirect: 'follow'
      })
      const result = await response.json()
      if (result.error) throw new BadRequestException(result.error)

      return { message: "Nameservers updated successfully", result }
    } catch (error) {
      throw error
    }
  }

  // Internal functions
  private constructHeader() {
    const myHeaders = new Headers();
    myHeaders.append("username", `${process.env.GO54_USERNAME}`);
    myHeaders.append("token", this.tokenGenertor());
    return myHeaders
  }

  private tokenGenertor() {
    const now = new Date();
    const gmtDate = new Date(now.toISOString());
    const formattedDate = gmtDate.toISOString().slice(2, 13).replace("T", " ");
    const message = `${process.env.GO54_USERNAME}:${formattedDate}`;
    const secret = `${process.env.GO54_API_KEY}`;

    // Perform HMAC SHA256 and Base64 encode — secret is the key, message is the data
    const hmacToken = createHmac('sha256', message).update(secret).digest('hex');
    return Buffer.from(hmacToken).toString("base64");
  }
}
