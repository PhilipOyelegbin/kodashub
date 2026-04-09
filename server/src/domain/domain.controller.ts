import { Controller, Post, Body, HttpCode, HttpStatus, Req, UseGuards, Get, ForbiddenException, Param } from '@nestjs/common';
import { DomainService } from './domain.service';
import { RegisterDomainDto, SearchDomainDto } from './dto/domain.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';

@ApiInternalServerErrorResponse({ description: "Internal server error" })
@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) { }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find all domains', description: 'Retrieve all domains' })
  @ApiOkResponse({ description: "Domains retrieved successfully" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseGuards(JwtGuard)
  @Get("all")
  findAll(@Req() req: any) {
    if (req.user.role !== "super_admin" && req.user.role !== "admin") {
      throw new ForbiddenException("You are not authorized to perform this action")
    }
    return this.domainService.findAll();
  }

  @ApiOperation({ summary: 'Search for a domain', description: 'Search for a domain' })
  @ApiOkResponse({ description: "Domain retrieved successfully" })
  @Post("search")
  @HttpCode(HttpStatus.OK)
  search(@Body() dto: SearchDomainDto) {
    return this.domainService.search(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register a domain', description: 'Register a domain' })
  @ApiCreatedResponse({ description: "Domain registered successfully" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @UseGuards(JwtGuard)
  @Post("register")
  register(@Body() dto: RegisterDomainDto, @Req() req: any) {
    return this.domainService.register(dto, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find all domains', description: 'Retrieve all domains' })
  @ApiOkResponse({ description: "Domains retrieved successfully" })
  @UseGuards(JwtGuard)
  @Get("user")
  findUserDomains(@Req() req: any) {
    return this.domainService.findUserDomains(req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find a domain', description: 'Retrieve a domain' })
  @ApiOkResponse({ description: "Domain retrieved successfully" })
  @UseGuards(JwtGuard)
  @Get(":id")
  findOneDomain(@Param("id") domainId: string) {
    return this.domainService.findOneDomain(domainId);
  }

  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Renew a domain', description: 'Renew a domain' })
  // @ApiOkResponse({ description: "Domain renewed successfully" })
  // @UseGuards(JwtGuard)
  // @Post('renew')
  // @HttpCode(HttpStatus.OK)
  // renew(@Body() dto: SearchDomainDto) {
  //   return this.domainService.renew(dto);
  // }
}
