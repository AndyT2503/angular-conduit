import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { render } from '@testing-library/angular';
import { BehaviorSubject, of, take } from 'rxjs';
import { Seo } from 'src/app/core/models';
import { getMockedSeoData } from 'src/app/testing.spec';
import { SeoService } from './seo.service';

describe(SeoService.name, () => {
  let service: SeoService;
  let mockedMeta: jasmine.SpyObj<Meta>;
  let mockedRouter: jasmine.SpyObj<Router>;
  let mockedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockedSeoData: Seo;
  let currentHTMLMetaElements: HTMLMetaElement[];
  async function setup(alreadyHasHTMLMetaElement: boolean = false) {
    mockedMeta = jasmine.createSpyObj<Meta>(Meta.name, [
      'removeTagElement',
      'addTags',
    ]);
    mockedRouter = jasmine.createSpyObj<Router>(Router.name, [], {
      events: new BehaviorSubject<NavigationEnd>(new NavigationEnd(1, '/', '/')),
    });
    mockedSeoData = getMockedSeoData();
    mockedRoute = jasmine.createSpyObj<ActivatedRoute>(
      ActivatedRoute.name,
      [],
      {
        firstChild: null,
        data: of(mockedSeoData),
      }
    );
    const { debugElement } = await render('', {
      providers: [
        { provide: Meta, useValue: mockedMeta },
        { provide: Router, useValue: mockedRouter },
        { provide: ActivatedRoute, useValue: mockedRoute },
        SeoService,
      ],
    });
    service = debugElement.injector.get(SeoService);
    if (alreadyHasHTMLMetaElement) {
      currentHTMLMetaElements = [{} as HTMLMetaElement, {} as HTMLMetaElement];
      service['metaElements'] = currentHTMLMetaElements;
    } else {
      currentHTMLMetaElements = [];
    }
  }

  it('Should create service instance', async () => {
    await setup();
    expect(service).toBeTruthy();
  });

  it('try subscribe loadSeoData', async () => {
    await setup();
    const setMetaTagsSpy = spyOn(service, 'setMetaTags');
    service
      .loadSeoData()
      .pipe(take(1))
      .subscribe((data) => {
        const seoData = data as Seo;
        expect(seoData).toEqual(mockedSeoData);
        expect(setMetaTagsSpy).toHaveBeenCalledWith(seoData.metaDefinition!);
      });
  });

  it('Try setMetaTags when metaElements is not empty', async () => {
    await setup(true);
    const newMetaDefinition = getMockedSeoData().metaDefinition!;
    service.setMetaTags(newMetaDefinition);
    expect(mockedMeta.removeTagElement).toHaveBeenCalledTimes(
      currentHTMLMetaElements.length
    );
    expect(mockedMeta.addTags).toHaveBeenCalledWith(newMetaDefinition, false);
  });

  it('Try setMetaTags when metaElements is empty', async () => {
    await setup();
    const newMetaDefinition = getMockedSeoData().metaDefinition!;
    service.setMetaTags(newMetaDefinition);
    expect(mockedMeta.removeTagElement).not.toHaveBeenCalled();
    expect(mockedMeta.addTags).toHaveBeenCalledWith(newMetaDefinition, false);
  });
});
